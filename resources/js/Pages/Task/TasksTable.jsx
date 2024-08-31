import Pagination from '../../Components/Pagination.jsx';
import SelectInput from '../../Components/SelectInput.jsx';
import TableHeading from '../../Components/TableHeading.jsx';
import TextInput from '../../Components/TextInput.jsx';
import { Link, router } from '@inertiajs/react';
import {TASK_STATUS_TEXT_MAP, TASK_STATUS_CLASS_MAP, TASK_PRIORITY_TEXT_MAP, TASK_PRIORITY_CLASS_MAP} from "../../constants.jsx";

export default function TasksTabale({tasks, queryParams = null, hideProjectColumn = false}) {
    queryParams = queryParams || {}
    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        }else{
            delete queryParams[name];
        }

        router.get(route("tasks.index"), queryParams);
    }

    const onKeyPress = (name, e) => {
        if(e.key !== "Enter") return;

        searchFieldChanged(name, e.target.value);
        
    }


    const deleteTask = (id, res) => {
        if(!window.confirm("Are you sure you want to delete this task?")){
            return;
        }

        router.delete(route("tasks.destroy", id));
    };


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
        
        router.get(route("tasks.index"), queryParams);
    }   

    return (
        <>
            <div className="flex items-center justify-between overflow-auto">
                    <table className="w-full text-sm  rtl:text-right text-gray-500 dark:text-gray-400">   
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                            <tr className="text-nowrap">
                                <TableHeading name="id" 
                                    sortable="true"
                                    sort_field={queryParams.sort_field} 
                                    sort_direction={queryParams.sort_direction} 
                                    sortChanged={sortChanged}  
                                > ID</TableHeading>
                                <th className="px-6 py-3 ">
                                    Image
                                </th>
                                <TableHeading name="name" 
                                    sortable="true"
                                    sort_field={queryParams.sort_field} 
                                    sort_direction={queryParams.sort_direction} 
                                    sortChanged={sortChanged}  
                                > Name</TableHeading>
                                {!hideProjectColumn && (<th className="px-6 py-3 ">
                                    Project Name
                                </th>)}
                                
                                <TableHeading name="status" 
                                    sortable="true"
                                    sort_field={queryParams.sort_field} 
                                    sort_direction={queryParams.sort_direction} 
                                    sortChanged={sortChanged}  
                                > Status</TableHeading>
                                <TableHeading name="priority" 
                                    sortable="true"
                                    sort_field={queryParams.sort_field} 
                                    sort_direction={queryParams.sort_direction} 
                                    sortChanged={sortChanged}  
                                > Priority</TableHeading>
                                
                                <TableHeading name="created_at" 
                                    sortable="true"
                                    sort_field={queryParams.sort_field} 
                                    sort_direction={queryParams.sort_direction} 
                                    sortChanged={sortChanged}  
                                > 
                                
                                Created Date</TableHeading>
                                <TableHeading name="due_date" 
                                    sortable="true"
                                    sort_field={queryParams.sort_field} 
                                    sort_direction={queryParams.sort_direction} 
                                    sortChanged={sortChanged}  
                                > due date</TableHeading>
                                <TableHeading name="createdBy" 
                                    sortable="true"
                                    sort_field={queryParams.sort_field} 
                                    sort_direction={queryParams.sort_direction} 
                                    sortChanged={sortChanged}  
                                > created by</TableHeading>
                                {/* <th
                                    className="px-6 py-3  text-xs font-medium text-gray-500 dark:text-gray-400">
                                    Updated By
                                </th> */}
                                <th
                                    className="px-6 py-3  text-xs font-medium text-gray-500 dark:text-gray-400">
                                    Assigned User
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
                                        placeholder="Task Name"
                                        onBlur={(e) => 
                                            searchFieldChanged('name', e.target.value)
                                        }
                                        onKeyPress={(e) => onKeyPress('name', e)}
                                    />
                                </th>
                                {!hideProjectColumn && (<th className="px-6 py-3  text-xs font-medium text-gray-500 dark:text-gray-400">
                                </th>)}
                                

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
                                        {Object.keys(TASK_STATUS_TEXT_MAP).map(status => (
                                            <option key={status} value={status}>{TASK_STATUS_TEXT_MAP[status]}</option>
                                        ))}
                                    </SelectInput>
                                </th>
                                <th className="px-6 py-3  text-xs font-medium text-gray-500 dark:text-gray-400">
                                    <SelectInput className="w-full px-8"
                                        defaultValue = {queryParams.priority} 
                                        onChange={(e) =>
                                            searchFieldChanged("priority", e.target.value)
                                        }
                                    >
                                        
                                        <option value="">Priority</option>
                                        {/* <option value="pending">Pending</option>
                                        <option value="pending">Pending</option>
                                        <option value="complete">Completed</option>
                                        <option value="cancelled">Cancelled</option> */}
                                        {Object.keys(TASK_PRIORITY_TEXT_MAP).map(priority => (
                                            <option key={priority} value={priority}>{TASK_PRIORITY_TEXT_MAP[priority]}</option>
                                        ))}
                                    </SelectInput>
                                </th>
                                <th className="px-6 py-3 "></th>
                                <th className="px-6 py-3 "></th>
                                <th className="px-6 py-3 "></th>
                                <th className="px-6 py-3 "></th>
                                {/* <th className="px-6 py-3 "></th> */}
                                <th className="px-6 py-3 "></th>
                            </tr>
                        </thead>


                        <tbody>
                        
                            {tasks.data.map(task =>(
                                <tr className="bg-white border-b dark:hover dark:bg-gray-800 dark:border-gray-700" key={task.id}> 
                                    <th className="px-3 py-2">{task.id}</th>
                                    <td className="px-3 py-2"><img className="rounded" style={{width:60, border:0}} src={task.image_path}></img></td>
                                    <td className="px-3 py-2">
                                        
                                        <Link 
                                            href={route("tasks.show", task.id)}
                                                className=" text-white text-nowrap dark:text-gray-100 hover:underline mx-1"
                                            >
                                            {task.name}
                                        </Link>
                                    </td>
                                    {!hideProjectColumn && (<td className="px-3 py-2">{task.project.name}</td>)}
                                    <td className="px-3 py-2 ">
                                        <span className={"px-2 py-1 rounded text-white text-nowrap " + TASK_STATUS_CLASS_MAP[task.status]}> {TASK_STATUS_TEXT_MAP[task.status]}</span>
                                    </td>
                                    <td className="px-3 py-2 ">
                                        <span className={"px-2 py-1 rounded text-white " + TASK_PRIORITY_CLASS_MAP[task.priority]}> {TASK_PRIORITY_TEXT_MAP[task.priority]}</span>
                                    </td>
                                    <td className="px-3 py-2">{task.created_at}</td>
                                    <td className="px-3 py-2">{task.due_date}</td>
                                    <td className="px-3 py-2">{task.createdBy.name}</td>
                                    {/* <td className="px-3 py-2">{task.createdBy.name}</td> */}
                                    <td className="px-3 py-2">{task.assignedUser.name}</td>
                                    <td className="px-3 py-2 text-nowrap">
                                        <Link href={route('tasks.edit', task.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1">
                                            Edit
                                        </Link>
                                        <button
                                            onClick={e =>deleteTask(task.id)}
                                          className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            
                            
                            
                        </tbody>
                    </table>
            </div>
            <Pagination links={tasks.meta.links} />
        
        </>
    );
}