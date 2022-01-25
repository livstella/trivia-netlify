import { createRouter, createWebHistory } from "vue-router";
import StartPage from '/src/views/StartPage.vue';
import QuizPage from '/src/views/Quiz.vue';
import ResultPage from '/src/views/Result.vue';

const routes = 
[
    {
        path: '/',
        name: 'Home',
        component: StartPage
    },
    {
        path: '/quiz',
        name: 'Quiz',
        component: QuizPage
    },
    {
        path: '/result',
        name: 'Result',
        component: ResultPage
        //component: ()=> import('/src/views/Result.vue') /* Lazy loading */
    },
];

const router = createRouter
({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

export default router;