import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link} from '@inertiajs/react';
import TasksTable from './TasksTable.jsx'

export default function Index({auth, tasks, queryParams = null}) {
 



    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Tasks</h2>
                    <Link 
                    href={route("tasks.create")}
                    className='bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-700 font-bold'>
                        Add New
                    </Link>
                </div>
            
        }
        >
            <Head title="Tasks" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            {/* <pre>{JSON.stringify(tasks, undefined, 2)}</pre>  */}
                            {/* {success && (
                                <div className='bg-emerald-500 py-2 px-4 mt-5 md-5 text-white rounded'>{success}</div>
                            )} */}
                            <br />
                            <TasksTable tasks={tasks} queryParams={queryParams} />
                        </div>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}