import * as users from './users/userData';
import * as clubs from './clubs/clubData';
import type { PrismaClient, Prisma, PrismaPromise } from '@prisma/client';
import prisma from './prisma';

export default {
    users,
    clubs
}