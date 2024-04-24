import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Films = () => {

    const [formData, setFormData] = useState({});
    const [data, setData] = useState([]);
    const token = useSelector((state) => state.token);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {    
        const fetchData = async () => {            
            const req = await fetch(`http://localhost:3001/api/v1/cinemas`, {
                method: 'GET',
                headers: {
                    "Authorization": token.token
                }
            });
            const res = await req.json();
            setData(res.message);
        } 
        fetchData();
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        await fetch('http://localhost:3001/api/v1/cine',
        {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type':  'application/json',
                "Authorization": token.token
            },
            body: JSON.stringify({...formData, isVisible: false, userId: token.user._id})
        })
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        console.log(formData);
    };

    return (
        <div className="flex flex-col justify-center items-center h-[100vh]">
            <div className="!z-5 relative flex flex-col rounded-[20px] max-w-[600px] bg-blue-300 bg-clip-border shadow-3xl shadow-shadow-500 w-full !p-4 3xl:p-![18px]">
                <form className="grid grid-cols-[1fr_1fr_120px] gap-2" onSubmit={handleSubmit}>
                    <div>
                        <input type="text" name='title' onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Titre" required />
                    </div>
                    <div>
                        <input type="text" name='genre' onChange={handleInputChange} placeholder="Genre" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    </div>
                    <button type="submit" className="w-full text-white bg-blue-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Envoyer</button>
                </form>
                <div className="h-full w-full">
                {data.length > 0 ? data.map((element, key) => (                
                    <div key={key} className="mt-5 flex items-center justify-between p-2">
                        <div className="flex items-center justify-center gap-2">
                            <input
                                type="checkbox"
                                checked={element.isVisible ? 'checked': null}
                                name="weekly"
                            />
                            <p className="text-base font-bold text-navy-700 dark:text-white">
                                {element.title}
                            </p>
                        </div>
                    </div> 
                )) : (<h3>Aucune donnée</h3>)}
                </div>
           
            </div>
        </div>
    );
};

export default Films;