import { useEffect, useState } from 'react';
import axios from 'axios';
import xml2js from 'xml2js';

export interface FinnkinoEvent {
    title: string;
    url: string;
}
export const useFinnkino = (id: number, date: string): FinnkinoEvent[] => {
    const [data, setData] = useState<FinnkinoEvent[]>([]);

    useEffect(() => {
        (async function(): Promise<void> {
            try {
                const response = await axios(`https://www.finnkino.fi/xml/Schedule/?area=${id}&dt=${date}`);
                const { Schedule } = await xml2js.parseStringPromise(response.data);
                const movies = Schedule.Shows[0].Show.flatMap((movie: any) => {
                    return { title: movie.Title[0], url: movie.EventURL[0] };
                }).reduce((result: FinnkinoEvent[], element: FinnkinoEvent) => {
                    const duplicate = result.find(m => m.title === element.title);
                    return duplicate ? result : [...result, element];
                }, []);
                setData(movies);
            } catch (error) {
                console.error(error);
            }
        })();
    }, [id, date]);

    return data;
};
