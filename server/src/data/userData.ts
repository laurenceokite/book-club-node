import type { Prisma, User, UserProfile } from "@prisma/client"
import prisma from "./prisma"
  
// -- CREATE --
async function addNewUser(
    email: string, 
    username: string, 
    password: string,
    profile?: UserProfile 
): Promise<User> {
    const user = await prisma.user.create({
        data: {
            email,
            username,
            password,
            profile: {
                create: profile ?? {
                    firstName: null,
                    lastName: null,
                    imgUrl: null,
                    bio: null
                }
            }
        }
    });
    return user;
}

//  -- READ --
async function getUserById(
    id: string, 
    include?: Prisma.UserInclude
): Promise<User | null> {
    const user = await prisma.user.findUnique({ 
        where: { id },
        include
    });
    return user;
}

async function getManyUsersById(...ids: string[]): Promise<User[]> {
    const users = await prisma.user.findMany({ 
        where: {
            id: {  
                in: ids,
            }
        }
    });
    return users;
}

async function getUserByUsername(
    username: string, 
    include?: Prisma.UserInclude
): Promise<User | null> {
    const user = await prisma.user.findUnique({ 
        where: { username },
        include
    });
    return user;
}



// -- UPDATE --
async function updateUser(
    id: string,
    data: Prisma.UserUpdateInput
): Promise<User> {
    const user = prisma.user.update({
        data,
        where: { id }
    });
    return user;
}

async function updateProfile(
    userId: string,
    data: UserProfile
): Promise<UserProfile> {
    const userProfile = prisma.userProfile.update({
        data,
        where: {
            userId
        }
    });
    return userProfile;
}
// --DELETE --
const deleteUser = async (id: string): Promise<User> => await prisma.user.delete({ where: { id }});

export default { 
    addNewUser,
    getUserById,
    getManyUsersById,
    getUserByUsername,
    updateProfile,
    updateUser,
    deleteUser 
}