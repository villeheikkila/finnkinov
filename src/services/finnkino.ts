import { useEffect, useState } from 'react';
import axios from 'axios'
const xml2js = require('xml2js')

export interface FinnkinoEvent {
    title: string,
    url: string,
}
export const useFinnkino = (id: Number, date: string) => {
    const [data, setData] = useState<FinnkinoEvent[]>([]);

    useEffect(() => {
        (async function() {
            const response = await axios(`https://www.finnkino.fi/xml/Schedule/?area=${id}&dt=${date}`);
            const { Schedule } = await xml2js.parseStringPromise(response.data)
            const movies = Schedule.Shows[0].Show.flatMap((movie: any) => {return {title: movie.Title[0], url: movie.EventURL[0]}}).reduce((result: FinnkinoEvent[], element: FinnkinoEvent) => {
                const duplicate = result.find( m => m.title === element.title )
                return duplicate ? result : [...result, element];
              }, []);
            setData(movies)
        })();
    }, [id, date])
      
    return [data]
}