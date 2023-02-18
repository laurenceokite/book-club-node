import { Club, Meeting, Prisma } from "@prisma/client";
import prisma from "./prisma";

// --CREATE--
async function createNewClub(
    userId: string,
    clubName: string, 
    members?: Prisma.ClubMemberCreateManyInput[]
): Promise<Club> {
    return await prisma.club.create({
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
}

async function createClubMeeting(
    clubId: string,
    title: string,
    time: string,
    location: string,
    conversationBody: string,
    bookId?: number
):  Promise<Meeting> {
    const conversation = await prisma.conversation.create({
        data: {
            title,
            clubId,
            private: true,
            body: conversationBody
        }
    })

    return await prisma.meeting.create({ 
        data: {
            clubId,
            title,
            time,
            conversationId: conversation.id,
            location,
            bookId
        }
     });
}

// -- READ --
async function getClubById(
    id: string, 
    include?: Prisma.ClubInclude
): Promise<Club | null> {
    return await prisma.club.findUnique({ 
        where: { id },
        include
    });
}

async function getManyClubsById(...ids: string[]): Promise<Club[]> {
    const club = await prisma.club.findMany({ 
        where: {
            id: {  
                in: ids
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

async function updateClubMeeting(
    id: number,
    data: Prisma.MeetingUpdateInput
): Promise<Meeting> {
    return await prisma.meeting.update({
        where: { id },
        data
    });
}

// -- DELETE -- 
const deleteClub = async (id: string): Promise<Club> => await prisma.club.delete({ where: { id }});

export default {
    createNewClub,
    getClubById,
    getManyClubsById,
    getClubByName,
    updateClub,
    deleteClub,
    createClubMeeting,
    updateClubMeeting
} 