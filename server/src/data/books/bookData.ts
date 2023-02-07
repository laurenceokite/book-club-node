import { Prisma, Book } from "@prisma/client";
import prisma from "../prisma";

// -- CREATE -- 
const createBookRecord = async (
    data: Prisma.BookCreateInput
): Promise<Book> => await prisma.book.create({ data });

// -- READ --
async function getBookById(
    id: number
): Promise<Book | null> {
    const book = await prisma.book.findUnique({ 
        where: { id },
    });
    return book;
}

async function getBookByIsbn(
    isbn: string
): Promise<Book | null> {
    const book = await prisma.book.findFirst({ 
        where: { 
            isbn: {
                has: isbn
            } 
        },   
    });
    return book;
}

async function getBookByTitle(
    title: string
): Promise<Book | null> {
    const book = await prisma.book.findFirst({ 
        where: { title },   
    });
    return book;
}

// -- UPDATE --
async function updateBookRecord(
    id: number,
    data: Prisma.BookUpdateInput 
): Promise<Book> {
    const book = prisma.book.update({
        where: {
            id
        },
        data
    });
    return book;
}

// -- DELETE -- 
const deleteBookRecord = async (id: number): Promise<Book> => await prisma.book.delete({ where: { id }});

export default {
    createBookRecord,
    getBookById,
    getBookByIsbn,
    getBookByTitle,
    updateBookRecord,
    deleteBookRecord
}