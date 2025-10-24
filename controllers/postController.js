import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


const getPosts = async (req, res) => {
    try{
        const posts = await prisma.post.findMany({
            include: { author: true },
        });
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve posts" });
    }
}

const createPost = async (req, res) => {
    const { title, content, authorId } = req.body;
    try {
        const newPost = await prisma.post.create({
            data: {
                title,
                content,
                author: { connect: { id: authorId } },
            },
        });
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ error: "Failed to create post" });
    }
}
export { getPosts, createPost };