import Pagination from '../../Components/Pagination.jsx';
import TableHeading from '../../Components/TableHeading.jsx';
import TextInput from '../../Components/TextInput.jsx';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from '@inertiajs/react';

export default function Index({auth, users, queryParams = null, success}) {
    queryParams = queryParams || {}
    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        }else{
            delete queryParams[name];
        }

        router.get(route("users.index"), queryParams);
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
        
        router.get(route("users.index"), queryParams);
    }   


    const deleteUser = (id, res) => {
        if(!window.confirm("Are you sure you want to delete this user")){
            return;
        }

        router.delete(route("users.destroy", id));
    };




    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Users</h2>
                    <Link 
                    href={route("users.create")}
                    className='bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-700 font-bold'>
                        Add New User
                    </Link>
                </div>
                
            }
        >
            <Head title="Users" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            Users Details
                            <br />
                            {success && (
                                <div className='bg-emerald-500 py-2 px-4 mt-5 md-5 text-white rounded'>{success}</div>
                            )}

                            {/* <pre>{JSON.stringify(users, undefined, 2)}</pre> */}
                            <div className="flex items-center justify-between overflow-auto mt-4">
                                <table className="w-full text-sm  rtl:text-right text-gray-500 dark:text-gray-400">   
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                        <tr className="text-nowrap">
                                           <TableHeading name="id" 
                                                sortable="true"
                                                sort_field={queryParams.sort_field} 
                                                sort_direction={queryParams.sort_direction} 
                                                sortChanged={sortChanged}  
                                           > ID</TableHeading>
                                            
                                            <TableHeading name="name" 
                                                sortable="true"
                                                sort_field={queryParams.sort_field} 
                                                sort_direction={queryParams.sort_direction} 
                                                sortChanged={sortChanged}  
                                           > Name</TableHeading>
                                            <TableHeading name="email" 
                                                sortable="true"
                                                sort_field={queryParams.sort_field} 
                                                sort_direction={queryParams.sort_direction} 
                                                sortChanged={sortChanged}  
                                           > Email</TableHeading>
                                            <TableHeading name="created_at" 
                                                sortable="true"
                                                sort_field={queryParams.sort_field} 
                                                sort_direction={queryParams.sort_direction} 
                                                sortChanged={sortChanged}  
                                           > Created Date</TableHeading>
                                            
                                            
                                            
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 text-right">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>

                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                        <tr className="text-nowrap">
                                            <th className="px-6 py-3 "></th>   
                                            
                                            <th className="px-6 py-3  text-xs font-medium text-gray-500 dark:text-gray-400">

                                                <TextInput className="w-full" 
                                                    defaultValue = {queryParams.name}
                                                    placeholder="User Name"
                                                    onBlur={(e) => 
                                                        searchFieldChanged('name', e.target.value)
                                                    }
                                                    onKeyPress={(e) => onKeyPress('name', e)}
                                                />
                                            </th>
                                            <th className="px-6 py-3  text-xs font-medium text-gray-500 dark:text-gray-400">
                                                <TextInput className="w-full px-8"
                                                    defaultValue = {queryParams.email} 
                                                    placeholder="Email"
                                                    onBlur={(e) => 
                                                        searchFieldChanged('email', e.target.value)
                                                    }
                                                    onKeyPress={(e) => onKeyPress('email', e)}
                                                />
                                            </th>
                                            <th className="px-6 py-3 "></th>
                                            <th className="px-6 py-3 "></th>
                                        </tr>
                                    </thead>


                                    <tbody>
                                    
                                        {users.data.map((user, index) =>(
                                            <tr className="bg-white border-b dark:hover dark:bg-gray-800 dark:border-gray-700" key={index}> 
                                                <th className="px-3 py-2">{user.id}</th>
                                                
                                                <th className="px-3 py-2">
                                                    {user.name}
                                                </th>
                                                <td className="px-3 py-2">{user.email}</td>
                                                <td className="px-3 py-2">{user.created_at}</td>
                                                <td className="px-3 py-2 text-nowrap">
                                                    <Link href={route('users.edit', user.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1">
                                                        Edit
                                                    </Link>

                                                    <button 
                                                        onClick={e =>deleteUser(user.id)}  
                                                        className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1">
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                        
                                        
                                        
                                    </tbody>
                                </table>
                            </div>
                            <Pagination links={users.meta.links} />
                        </div>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}