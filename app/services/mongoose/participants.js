const Participant = require('../../api/v1/participants/model');
const {
    BadRequestError,
    NotFoundError,
    UnauthorizedError,
} = require('../../errors');

const { otpMail } = require('../mail');

const signupParticipant = async (req) => {
    const { firstName, lastName, email, password, role } = req.body;

    let result = await Participant.findOne({
        email,
        status: 'tidak aktif',
    });

    if (result) {
        result.firstName = firstName;
        result.lastName = lastName;
        result.role = role;
        result.email = email;
        result.password = password;
        result.otp = Math.floor(Math.random() * 9999);
        await result.save();
    } else {
        result = await Participant.create({
            firstName,
            lastName,
            email,
            password,
            role,
            otp: Math.floor(Math.random() * 9999),
        });
    }
    await otpMail(email, result)

    delete result._doc.password;
    delete result._doc.otp;

    return result;
};

const activateParticipant = async (req) => {
    const { otp, email }  = req.body;
    const check  = await Participant.findOne({
        email,
    });

    if (!check) throw new NotFoundError('Pertisipan belum terdaftar');

    if (check && check.otp !== otp) throw new BadRequestError('Kode OTP salah');

    const result = await Participant.findByIdAndUpdate(check._id, {
        status: 'aktif',
    },
    { new: true, runValidator: true });

    delete result._doc.password;

    return result;
};

const signinParticipant = async (req) => {
    const { email, password } = req.body;
    
};

module.exports = { 
    signupParticipant,
    activateParticipant,
 };