import { createContext, useEffect, useState } from 'react';
import { Auth, DataStore } from 'aws-amplify';
import { Restaurant } from '../models';
import { useContext } from 'react';

const RestaurantContext = createContext({});

const RestaurantContextProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [restaurant, setRestaurant] = useState();
    const sub = user?.attributes.sub;

    useEffect(() => {
        Auth.currentAuthenticatedUser({bypassCache: true}).then(setUser);
    }, [])
    
    useEffect(() => {
        if (!sub) {
            return;
        }
      //fetch restaurant and filter by admin
      DataStore.query(Restaurant, (r) => r.adminSub("eq", sub)).then((restaurant) => setRestaurant(restaurant[0]));
    }, [sub]);
    
    return <RestaurantContext.Provider value={{restaurant, setRestaurant, sub}}>{children}</RestaurantContext.Provider>;
}

export default RestaurantContextProvider;

export const useRestaurantContext = () => useContext(RestaurantContext);