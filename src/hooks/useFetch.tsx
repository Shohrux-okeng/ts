import { useEffect, useState, type SetStateAction } from "react"
import { api } from "../api"


interface IParams {
    limit: number
    skip: number
}
export const useFetch  = <T,>(endpoint:string, params?:IParams) => {
    const [data, setData] = useState<T | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(()=>{
        setLoading(true)
        api
            .get(endpoint, {params})
            .then((res: { data: SetStateAction<T | null> }) => setData(res.data))
            .catch((err: SetStateAction<string | null>) => setError(err))
            .finally(() => setLoading(false))
    }, [endpoint, JSON.stringify(params)])


    return {data, loading, error}
} 


