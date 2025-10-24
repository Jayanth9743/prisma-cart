import express from 'express';
import { getPosts,createPost, getCourses, getStudents,createCourse,createStudent,enrollStudentInCourse } from '../controllers/postController.js';

const postRouter = express.Router();

postRouter.get('/', getPosts);
postRouter.post('/', createPost);
postRouter.get('/students', getStudents);
postRouter.get('/courses', getCourses);
postRouter.post('/courses', createCourse);
postRouter.post('/students', createStudent);
postRouter.post('/enroll', enrollStudentInCourse);

export default postRouter;