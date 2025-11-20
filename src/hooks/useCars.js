import { useState, useEffect } from 'react';
import { supabase } from '../supabase/config';
import { INITIAL_CARS } from '../data/mockData';

export const useCars = () => {
    const [cars, setCars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchAndSeedCars = async () => {
        try {
            setIsLoading(true);
            // 1. Fetch data
            const { data: carsData, error: fetchError } = await supabase
                .from('cars')
                .select('*')
                .order('created_at', { ascending: false });

            if (fetchError) throw fetchError;

            // 2. Check if seeding is needed
            if (carsData && carsData.length === 0) {
                console.log("No cars found, seeding database...");
                const carsToSeed = INITIAL_CARS.map(({ timestamp, ...car }) => car);
                const { error: insertError } = await supabase.from('cars').insert(carsToSeed);

                if (insertError) throw insertError;

                // Refetch after seeding
                const { data: newCarsData, error: refetchError } = await supabase
                    .from('cars')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (refetchError) throw refetchError;

                setCars(newCarsData || []);
            } else {
                setCars(carsData || []);
            }
        } catch (err) {
            console.error("Error in useCars:", err);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAndSeedCars();

        // 3. Set up real-time subscription
        const channel = supabase
            .channel('public:cars')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'cars' }, (payload) => {
                console.log('Change received!', payload);
                fetchAndSeedCars();
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const addCar = async (carData) => {
        try {
            const { timestamp, ...restOfCarData } = carData;
            const { error } = await supabase.from('cars').insert([restOfCarData]);
            if (error) throw error;
            return { success: true };
        } catch (err) {
            console.error("Error adding car:", err);
            return { success: false, error: err.message };
        }
    };

    const deleteCar = async (id) => {
        try {
            const { error } = await supabase.from('cars').delete().eq('id', id);
            if (error) throw error;
            return { success: true };
        } catch (err) {
            console.error("Error deleting car:", err);
            return { success: false, error: err.message };
        }
    };

    return { cars, isLoading, error, addCar, deleteCar };
};
