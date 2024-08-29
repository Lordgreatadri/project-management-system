import Pagination from '../../Components/Pagination.jsx';
import SelectInput from '../../Components/SelectInput.jsx';
import TableHeading from '../../Components/TableHeading.jsx';
import TextInput from '../../Components/TextInput.jsx';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/solid';
import { Head, Link, router } from '@inertiajs/react';
import {PROJECT_STATUS_TEXT_MAP, PROJECT_STATUS_CLASS_MAP} from "../../constants.jsx";

export default function Index({auth, projects, queryParams = null}) {
    queryParams = queryParams || {}
    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        }else{
            delete queryParams[name];
        }

        router.get(route("projects.index"), queryParams);
    }

    const onKeyPress = (name, e) => {
        if(e.key !== "Enter") return;

        searchFieldChanged(name, e.target.value);
        
    }

    const sortChanged = (name) => {
        if(name === queryParams.sort_field) //if the filed has been sorted already we reverse the direction
        {
            queryParams.sort_direction = queryParams.sort_direction === "asc"? "desc" : "asc";
            
            ////this does the same thins as the above
            // if(queryParams.sort_direction === "asc"){
            //     queryParams.sort_direction = "desc";
            // }else{
            //     queryParams.sort_direction = "asc"
            // }
        }else{
            queryParams.sort_field = name;
            queryParams.sort_direction = "asc";
        }
        
        router.get(route("projects.index"), queryParams);
    }   




    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Projects</h2>}
        >
            <Head title="Projects" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            Projects Details
                            <br />

                            {/* <pre>{JSON.stringify(projects, undefined, 2)}</pre> */}
                            <div className="flex items-center justify-between overflow-auto">
                                <table className="w-full text-sm  rtl:text-right text-gray-500 dark:text-gray-400">   
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                        <tr className="text-nowrap">
                                           <TableHeading header="id" 
                                                sortable="true"
                                                sort_field={queryParams.sort_field} 
                                                sort_direction={queryParams.sort_direction} 
                                                sortChanged={sortChanged}  
                                           > ID</TableHeading>
                                            <th className="px-6 py-3 ">
                                                Image
                                            </th>
                                            <th
                                                onClick ={(e) => sortChanged("name")} 
                                                >
                                                <div className="cursor-pointer px-6 py-3 
                                                    flex items-center justify-between gap-1
                                                    ">
                                                    Name
                                                    <div>
                                                        <ChevronUpIcon className={
                                                            "w-4" + 
                                                            (queryParams.sort_field === "name" && queryParams.sort_direction === "asc"? " text-white" : "")
                                                            }/>
                                                        <ChevronDownIcon className={
                                                            "w-4 -mt-2 " +
                                                            (queryParams.sort_field === "name" && queryParams.sort_direction === "desc"? " text-white" : "")}
                                                        />
                                                    </div>
                                                </div>
                                            </th>
                                            <th
                                                onClick ={(e) => sortChanged("status")} 
                                                >
                                                <div className="cursor-pointer px-6 py-3 
                                                    flex items-center justify-between gap-1
                                                    ">   
                                                    Status
                                                    <div>
                                                        <ChevronUpIcon className={
                                                            "w-4" + 
                                                            (queryParams.sort_field === "status" && queryParams.sort_direction === "asc"? " text-white" : "")
                                                            }/>
                                                        <ChevronDownIcon className={"w-4 -mt-2 " +
                                                        (queryParams.sort_field === "status" && queryParams.sort_direction === "desc"? " text-white" : "")}/>
                                                    </div>
                                                </div> 
                                            </th>
                                            <th
                                                onClick ={(e) => sortChanged("created_at")} 
                                                >
                                                <div className="cursor-pointer px-6 py-3 
                                                    flex items-center justify-between gap-1
                                                    ">
                                                    Created Date
                                                    <div>
                                                        <ChevronUpIcon className={
                                                            "w-4" + 
                                                            (queryParams.sort_field === "created_at" && queryParams.sort_direction === "asc"? " text-white" : "")
                                                            }/>
                                                        <ChevronDownIcon className={"w-4 -mt-2 " +
                                                        (queryParams.sort_field === "created_at" && queryParams.sort_direction === "desc"? " text-white" : "")}/>
                                                    </div>
                                                </div>
                                            </th>
                                            <th
                                                onClick ={(e) => sortChanged("due_date")} 
                                                >
                                                <div className="cursor-pointer px-6 py-3 
                                                flex items-center justify-between gap-1
                                                ">
                                                    Due Date
                                                    <div>
                                                        <ChevronUpIcon className={
                                                            "w-4" + 
                                                            (queryParams.sort_field === "due_date" && queryParams.sort_direction === "asc"? " text-white" : "")
                                                            }/>
                                                        <ChevronDownIcon className={"w-4 -mt-2 " +
                                                        (queryParams.sort_field === "due_date" && queryParams.sort_direction === "desc"? " text-white" : "")}/>
                                                    </div>
                                                </div>
                                            </th>
                                            <th 
                                                onClick ={(e) => sortChanged("createdBy")} 
                                                >
                                                <div className="cursor-pointer px-6 py-3 
                                                    flex items-center justify-between gap-1
                                                    ">
                                                    Created By
                                                    <div>
                                                        <ChevronUpIcon className={
                                                            "w-4" + 
                                                            (queryParams.sort_field === "createdBy" && queryParams.sort_direction === "asc"? " text-white" : "")
                                                            }/>
                                                        <ChevronDownIcon className={"w-4 -mt-2 " +
                                                        (queryParams.sort_field === "createdBy" && queryParams.sort_direction === "desc"? " text-white" : "")}/>
                                                    </div>
                                                </div>
                                            </th>
                                            <th
                                                className="px-6 py-3  text-xs font-medium text-gray-500 dark:text-gray-400">
                                                Updated By
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 text-right">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>

                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                        <tr className="text-nowrap">
                                            <th className="px-6 py-3 "></th>   
                                            <th className="px-6 py-3 "></th>
                                            <th className="px-6 py-3  text-xs font-medium text-gray-500 dark:text-gray-400">

                                                <TextInput className="w-full" 
                                                    defaultValue = {queryParams.name}
                                                    placeholder="Project Name"
                                                    onBlur={(e) => 
                                                        searchFieldChanged('name', e.target.value)
                                                    }
                                                    onKeyPress={(e) => onKeyPress('name', e)}
                                                />
                                            </th>
                                            <th className="px-6 py-3  text-xs font-medium text-gray-500 dark:text-gray-400">
                                                <SelectInput className="w-full px-8"
                                                    defaultValue = {queryParams.status} 
                                                    onChange={(e) =>
                                                        searchFieldChanged("status", e.target.value)
                                                    }
                                                >
                                                    
                                                    <option value="">Status</option>
                                                    {/* <option value="pending">Pending</option>
                                                    <option value="pending">Pending</option>
                                                    <option value="complete">Completed</option>
                                                    <option value="cancelled">Cancelled</option> */}
                                                    {Object.keys(PROJECT_STATUS_TEXT_MAP).map(status => (
                                                        <option key={status} value={status}>{PROJECT_STATUS_TEXT_MAP[status]}</option>
                                                    ))}
                                                </SelectInput>
                                            </th>
                                            <th className="px-6 py-3 "></th>
                                            <th className="px-6 py-3 "></th>
                                            <th className="px-6 py-3 "></th>
                                            <th className="px-6 py-3 "></th>
                                            <th className="px-6 py-3 "></th>
                                        </tr>
                                    </thead>


                                    <tbody>
                                    
                                        {projects.data.map(project =>(
                                            <tr className="bg-white border-b dark:hover dark:bg-gray-800 dark:border-gray-700" key={project.id}> 
                                                <th className="px-3 py-2">{project.id}</th>
                                                <td className="px-3 py-2"><img className="rounded" style={{width:60, border:0}} src={project.image_path}></img></td>
                                                <td className="px-3 py-2">{project.name}</td>
                                                <td className="px-3 py-2 ">
                                                    <span className={"px-2 py-1 rounded text-white " + PROJECT_STATUS_CLASS_MAP[project.status]}> {PROJECT_STATUS_TEXT_MAP[project.status]}</span>
                                                </td>
                                                <td className="px-3 py-2">{project.created_at}</td>
                                                <td className="px-3 py-2">{project.due_date}</td>
                                                <td className="px-3 py-2">{project.createdBy.name}</td>
                                                <td className="px-3 py-2">{project.createdBy.name}</td>
                                                <td className="px-3 py-2">
                                                    <Link href={route('projects.edit', project.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1">
                                                        Edit
                                                    </Link>
                                                    <Link href={route('projects.destroy', project.id)}  className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1">
                                                        Delete
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                        
                                        
                                        
                                    </tbody>
                                </table>
                            </div>
                            <Pagination links={projects.meta.links} />
                        </div>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}