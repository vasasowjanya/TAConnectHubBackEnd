import bcrypt from 'bcrypt';
import ApiError from '../errors/apiError.js';
import status from 'http-status';
import prisma from '../config/prisma.js';
import httpStatus from 'http-status';
import environmentVariables from '../config/environmentVariables.js';

const mongoObjectId = function () {
    var timestamp = ((new Date().getTime() / 1000) | 0).toString(16);
    return (
        timestamp +
        'xxxxxxxxxxxxxxxx'
            .replace(/[x]/g, function () {
                return ((Math.random() * 16) | 0).toString(16);
            })
            .toLowerCase()
    );
};

const signup = async (userData, type, userTypeData) => {
    return await prisma.$transaction(async (tx) => {
        let ta_applicant_id = mongoObjectId();
        let department_staff_id = mongoObjectId();
        let ta_committee_member_id = mongoObjectId();
        let instructor_id = mongoObjectId();

        switch (type) {
            case 'ta_applicant':
                const ta_applicant = await tx.taApplicant.create({
                    data: userTypeData,
                });
                ta_applicant_id = ta_applicant.id;
                break;
            case 'department_staff':
                const department_staff = await tx.departmentStaff.create({
                    data: userTypeData,
                });
                department_staff_id = department_staff.id;
                break;
            case 'ta_committee_member':
                const ta_committee_member = await tx.taCommitteeMember.create({
                    data: userTypeData,
                });
                ta_committee_member_id = ta_committee_member.id;
                break;
            case 'instructor':
                const instructor = await tx.instructor.create({
                    data: userTypeData,
                });
                instructor_id = instructor.id;
                break;
        }

        const user = await tx.user.create({
            data: {
                ...userData,
                type,
                ta_applicant_id,
                department_staff_id,
                ta_committee_member_id,
                instructor_id,
            },
        });

        return user;
    });
};

const login = async (credentials) => {
    const user = await prisma.user.findUnique({
        where: { email: credentials.email },
        include: {
            ta_applicant: true,
            ta_committee_member: true,
            department_staff: true,
            instructor: true,
        },
    });
    if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');

    const passwordMatch = await bcrypt.compare(
        credentials.password,
        user.password,
    );

    if (!passwordMatch) {
        throw new ApiError(status.UNAUTHORIZED, 'Invalid credentials');
    }

    return user;
};

const updateProfile = async (id, data) => {
    const { new_password, password, ...rest } = data;
    const user = await prisma.user.findUnique({
        where: { id },
    });

    if (password && new_password) {
        console.log(password, new_password);
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch)
            throw new ApiError(status.UNAUTHORIZED, 'Invalid credentials');

        rest.password = await bcrypt.hash(
            new_password,
            +environmentVariables.bcrypt.saltRounds,
        );
    }
    return await prisma.user.update({
        where: { id },
        data: rest,
        include: {
            ta_applicant: true,
            ta_committee_member: true,
            department_staff: true,
            instructor: true,
        },
    });
};

export const authServices = { login, signup, updateProfile };
