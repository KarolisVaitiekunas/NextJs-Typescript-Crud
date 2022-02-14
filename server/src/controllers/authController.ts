import { Request, Response } from 'express';
import UserModel from '../models/User';
import config from 'config';
import crypto from 'crypto';
import sendEmail from '../utils/email';
import sanitize from 'mongo-sanitize';

const clientHost = config.get<string>('clientHost');
const clientPort = config.get<number>('clientPort');

const register = async (req: Request, res: Response) => {
  req.body = sanitize(req.body); //prevent nosql injection
  try {
    const userNameExists = await UserModel.findOne({ username: req.body.username });
    if (userNameExists) {
      return res.status(403).json({
        success: false,
        message: 'Usename is already taken',
      });
    }

    const emailNameExists = await UserModel.findOne({ email: req.body.email });
    if (emailNameExists) {
      return res.status(403).json({
        success: false,
        message: 'Email is already taken',
      });
    }

    UserModel.create(req.body);

    res.status(201).json({
      success: true,
      message: 'User created successfuly',
    });
  } catch (error) {
    console.log('ERROR', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const login = async (req: Request, res: Response) => {
  const user = await UserModel.findOne({ email: req.body.email }).select('+password');
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'wrong email and email combination',
    });
  }

  const isValid = await user.validatePassword(req.body.password);

  if (!isValid) {
    return res.status(401).json({
      success: false,
      message: 'wrong email and email combination',
    });
  }

  const accessToken = user.createAccessToken();

  res.cookie('access-token', accessToken, {
    maxAge: 60 * 60000,
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: 'User logged in',
  });
};

const forgotpassword = async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'unknown email' });
    }
    const resetToken = user.createResetToken();
    await user.save();

    const URL = `http://${clientHost}:${clientPort}/reset/${resetToken}`;
    const message = `
    <h1>Please go to this link to reset your password</1>
    <a href=${URL}>Cick here to reset your password</a>
    `;

    try {
      await sendEmail({
        to: user.email,
        subject: 'Password Reset Request',
        text: message,
      });

      return res.status(200).json({
        success: true,
        message: 'Email sent',
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();

      return res.status(200).json({
        success: false,
        message: 'Email could not be sent',
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const resetpassword = async (req: Request, res: Response) => {
  const resetPasswordToken = crypto.createHash('sha256').update(req.params.resetToken).digest('hex');
  try {
    const user = await UserModel.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(201).json({
      success: true,
      message: 'Password Reset Success',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to change password, please try again later.',
    });
  }
};

const loggedIn = (req: Request, res: Response) => {
  res.status(201).json({
    success: true,
    message: 'User is authorized',
    data: req.user,
  });
};

const logout = (req: Request, res: Response) => {
  req.user = null;
  res.cookie('access-token', '', {
    maxAge: 0,
  });
  res.status(200).json({
    success: true,
    message: 'User logged out',
  });
};

export { register, login, forgotpassword, resetpassword, loggedIn, logout };
