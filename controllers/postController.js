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


const getStudents = async(req,res)=>{
    try{
        const students = await prisma.student.findMany({
            include: { courses: true },
        });
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve students" });
    }
}
const getCourses = async(req,res)=>{
    try{
        const courses = await prisma.course.findMany({
            include: { students: true },
        });
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve courses" });
    }
}

const createCourse = async (req, res) => {
    const { title } = req.body;
    try {
        const newCourse = await prisma.course.create({
            data: {
                title,
            },
        });
        res.status(201).json(newCourse);
    } catch (error) {
        res.status(500).json({ error: "Failed to create course" });
    }
};

const createStudent = async (req, res) => {
    const { name, email } = req.body;
    try {
        const newStudent = await prisma.student.create({
            data: {
                name,
                email,
            },
        });
        res.status(201).json(newStudent);
    } catch (error) {
        res.status(500).json({ error: "Failed to create student" });
    }
};

const enrollStudentInCourse = async (req, res) => {
    const { studentId, courseId } = req.body;
    try {
        const enrollment = await prisma.course.update({
            where: { id: courseId },
            data: {
                students: {
                    connect: { id: studentId },
                },
            },
        });
        res.status(200).json(enrollment);
    } catch (error) {
        res.status(500).json({ error: "Failed to enroll student in course" });
    }
};

export { getPosts, createPost, getStudents, getCourses, createCourse, createStudent, enrollStudentInCourse };