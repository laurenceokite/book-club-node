import { Prisma, Conversation, Response, Reaction } from "@prisma/client";
import prisma from "./prisma";

// -- CREATE --
async function createConversation(
    data: Prisma.ConversationCreateInput
): Promise<{ id: number }> {
    const convoId = await prisma.conversation.create({ 
        data,
        select: {
            id: true,
        } 
    });
    return convoId;
}

async function createResponse(
    data: Prisma.ResponseCreateInput
): Promise<{ id: number }> {
    const responseId = await prisma.response.create({ 
        data,
        select: {
            id: true,
        } 
    });
    return responseId;
}

async function createReaction(
    reaction: string,
    responseId: number,
    userId: string
): Promise<{ success: boolean }> {
    const convoId = await prisma.reaction.create({ 
        data: {
            reaction,
            responseId,
            userId
        }
    });
    return {
        success: true
    };
}

// -- READ --
async function getConversationById(
    id: number, 
    include?: Prisma.ConversationInclude
): Promise<Conversation | null> {
    const convo = await prisma.conversation.findUnique({ 
        where: { id },
        include
    });
    return convo;
}

async function getResponseById(
    id: number, 
    include?: Prisma.ResponseInclude
): Promise<Response | null> {
    const response = await prisma.response.findUnique({ 
        where: { id },
        include
    });
    return response;
}

// -- UPDATE -- 
async function updateConversation(
    id: number,
    data: Prisma.ConversationUpdateInput
): Promise<{
    success: boolean
}> {
    const convo = prisma.conversation.update({
        data,
        where: { id }
    });
    return {
        success: true
    };
}

async function updateResponse(
    id: number,
    data: Prisma.ResponseUpdateInput
): Promise<{
    success: boolean
}> {
    const convo = prisma.response.update({
        data,
        where: { id }
    });
    return {
        success: true
    };
}
// -- DELETE --
const deleteConversation = async (id: number): Promise<Conversation> => await prisma.conversation.delete({ where: { id }});
const deleteResponse = async (id: number): Promise<Response> => await prisma.response.delete({ where: { id }});
const deleteReaction = async (id: number): Promise<Reaction> => await prisma.reaction.delete({ where: { id }});

export default {
    createConversation,
    createResponse,
    createReaction,
    getConversationById,
    getResponseById,
    updateConversation,
    updateResponse,
    deleteConversation,
    deleteReaction,
    deleteResponse
}