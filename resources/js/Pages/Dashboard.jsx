import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import {TASK_STATUS_TEXT_MAP, TASK_STATUS_CLASS_MAP} from "../constants.jsx";

export default function Dashboard({ auth, totalTasks, myTasks, myPendingTasks, totalPendingTasks, totalCompletedTasks, myCompletedTasks, totalInProgressTasks, myInProgressTasks, activeTasks }) {
    return (
        <AuthenticatedLayout
            user={auth.user} 
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 grid grid-cols-4 gap-2">{/* flex */}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className="font-semibold text-[#4942cf] text-xl">Total Tasks</h3>
                            <p className="font-semibold text-gray-400 dark:text-gray-400">
                                <span className='mt-4 mr-2'>{myTasks}</span>
                                /
                                <span className='mt-4 ml-2'>{totalTasks}</span>
                            </p>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className="font-semibold text-[#4942cf] text-xl">Pending Tasks</h3>
                            <p className="font-semibold text-gray-400 dark:text-gray-400">
                                <span className='mt-4 mr-2'>{myPendingTasks}</span>
                                /
                                <span className='mt-4 ml-2'>{totalPendingTasks}</span>
                            </p>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className="font-semibold text-[#4942cf] text-xl">Tasks In Progress </h3>
                            <p className="font-semibold text-gray-400 dark:text-gray-400">
                                <span className='mt-4 mr-2'>{myInProgressTasks}</span>
                                /
                                <span className='mt-4 ml-2'>{totalInProgressTasks}</span>
                            </p>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className="font-semibold text-[#4942cf] text-xl">Completed Tasks  </h3>
                            <p className="font-semibold text-gray-400 dark:text-gray-400">
                                <span className='mt-4 mr-2'>{myCompletedTasks}</span>
                                /
                                <span className='mt-4 ml-2'>{totalCompletedTasks}  </span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto mt-5 sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100"> 
                            <h1 className="font-semibold text-gray-400 text-xl py-4">My Active Tasks</h1>
                            <hr />
                            <table  className=" w-full text-sm  rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead  className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                    <tr>
                                        <th>#</th>
                                        <th>Task Title</th>
                                        <th>Project Name</th>
                                        <th>Status</th>
                                        <th>Due Date</th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                {/* <pre>{JSON.stringify(activeTasks, undefined, 2)}</pre> */}
                                    {activeTasks.data.map((task, index) => (
                                        <tr className="bg-white border-b dark:hover dark:bg-gray-800 dark:border-gray-700" key={index}>
                                            <td  className="px-3 py-2">{index + 1}</td>
                                            <td  className="px-3 py-2">
                                                <Link
                                                    href={route("tasks.show", task.id)}
                                                        className=" text-white text-nowrap dark:text-gray-100 hover:underline mx-1"
                                                    >
                                                    {task.name}
                                                </Link>
                                                </td>
                                            <td  className="px-3 py-2">{task.project.name}</td>
                                            <td  className="px-3 py-2"><span className={"px-2 py-1 rounded text-white text-nowrap " + TASK_STATUS_CLASS_MAP[task.status]}> {TASK_STATUS_TEXT_MAP[task.status]}</span></td>
                                            <td  className="px-3 py-2">{task.due_date}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
