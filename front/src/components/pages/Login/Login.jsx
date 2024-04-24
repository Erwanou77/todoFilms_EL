import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { storeToken } from '../../../redux/tokenSlice';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [email,setEmail] = useState("");
    const [error, setError] = useState("");
    const [password,setPassword] = useState("");
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (email.length === 0 || password.length === 0) return setError("Email ou Password vide")
            const req = await fetch('http://localhost:3001/api/v1/login',
                {
                    method: "POST",
                    headers: {
                        Accept: 'application/json',
                        'Content-Type':  'application/json',
                    },
                    body: JSON.stringify({
                        password: password,
                        email: email
                    })
                })
            const res = await req.json()
            if (!req.ok) return setError("Mauvaise combinaison")
            dispatch(storeToken(res.message))
            navigate("/films");
        } catch (e) {
            console.error(e.message)
        } finally {
            setTimeout(() => {
                setError("")
            }, 2000)
        }
    }
    return (
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Connectez vous à votre compte
                    </h1>
                    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Votre mail</label>
                            <input type="email" id="email" onChange={(e) => setEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Votre mot de passe</label>
                            <input type="password" onChange={(e) => setPassword(e.target.value)} id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                        </div>
                        <button type="submit" className="w-full text-white bg-blue-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Connexion</button>
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Pas de compte ? <Link to='/inscription' className="font-medium text-primary-600 hover:underline dark:text-primary-500">Inscrivez-vous</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;