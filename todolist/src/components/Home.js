import { useEffect, useState, useRef } from "react";
import supabase from "../supabaseClient";
import RecoverPassword from "./RecoverPassword";

const Home = ({ user }) => {
    const [recoveryToken, setRecoveryToken] = useState(null);
    const [todos, setTodos] = useState([]);
    const newTaskTextRef = useRef();
    const [errorText, setError] = useState("");

    useEffect(() => {
        /* Recovery url is of the form
         * <SITE_URL>#access_token=x&refresh_token=y&expires_in=z&token_type=bearer&type=recovery
         * Read more on https://supabase.com/docs/reference/javascript/reset-password-email#notes
         */
        let url = window.location.hash;
        let query = url.slice(1);
        let result = {};

        query.split("&").forEach((part) => {
            const item = part.split("=");
            result[item[0]] = decodeURIComponent(item[1]);
        });

        if (result.type === "recovery") {
            setRecoveryToken(result.access_token);
        }

        fetchTodos().catch(console.error);
    }, []);

    const fetchTodos = async () => {
        let { data: todos, error } = await supabase
            .from("todos")
            .select("*")
            .order("id", { ascending: false });
        if (error) console.log("error", error);
        else setTodos(todos);
    };

    const deleteTodo = async (id) => {
        try {
            await supabase.from("todos").delete().eq("id", id);
            setTodos(todos.filter((x) => x.id !== id));
        } catch (error) {
            console.log("error", error);
        }
    };

    const addTodo = async () => {
        let taskText = newTaskTextRef.current.value;
        let task = taskText.trim();
        if (task.length <= 3) {
            setError("Task length should be more than 3!");
        } else {
            let { data: todo, error } = await supabase
                .from("todos")
                .insert({ task, user_id: user.id })
                .single();
            if (error) setError(error.message);
            else {
                setTodos([todo, ...todos]);
                setError(null);
                newTaskTextRef.current.value = "";
            }
        }
    };

    const handleLogout = async () => {
        supabase.auth.signOut().catch(console.error);
    };

    return recoveryToken ? (
        <RecoverPassword
            token={recoveryToken}
            setRecoveryToken={setRecoveryToken}
        />
    ) : (
        <div className={"w-screen fixed flex flex-col min-h-screen bg-gray-50"}>
            <header
                className={
                    "flex justify-between items-center px-4 h-16 bg-gray-900"
                }
            >
                <span
                    className={
                        "text-2xl sm:text-4xl text-white border-b font-sans"
                    }
                >
                    Todo List.
                </span>
                <button
                    onClick={handleLogout}
                    className={
                        "flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition duration-150 ease-in-out"
                    }
                >
                    Logout
                </button>
            </header>
            
        </div>
    );
};

export default Home;