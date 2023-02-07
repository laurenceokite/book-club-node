import { Club, Prisma } from "@prisma/client";
import prisma from "../prisma";

// --CREATE--
async function createNewClub(
    userId: string,
    clubName: string, 
    members?: Prisma.ClubMemberCreateManyInput[]
): Promise<Club> {
    const newClub = await prisma.club.create({
        data: {
            clubName,
            members: {
                create: {
                    userId,
                    role: 'ADMIN'
                },
                createMany: {
                    data: members ?? []
                }
            }
        }
    });
    return newClub;
}

// -- READ --
async function getClubById(
    id: string, 
    include?: Prisma.ClubInclude
): Promise<Club> {
    const club = await prisma.club.findUniqueOrThrow({ 
        where: { id },
        include
    });
    return club;
}

async function getManyClubsById(ids: string): Promise<Club[]> {
    const club = await prisma.club.findMany({ 
        where: {
            id: {  
                in: [ ...ids ]
            }
        }
    });
    return club;
}
async function getClubByName(clubName: string): Promise<Club> {
    const club = await prisma.club.findUniqueOrThrow({ where: { clubName }});
    return club;
}

// -- UPDATE -- 
async function updateClub(
    id: string, 
    data: Prisma.ClubUpdateInput
    ): Promise<Club> {
    const updatedClub = await prisma.club.update({ 
        where: { id },
        data
    });
    return updatedClub;
}

// -- DELETE -- 
const deleteClub = async (id: string): Promise<Club> => await prisma.club.delete({ where: { id }});

export {
    createNewClub,
    getClubById,
    getManyClubsById,
    getClubByName,
    updateClub,
    deleteClub
} 