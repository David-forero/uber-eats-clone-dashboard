import React, { useEffect, useState } from "react";
import { Form, Input, Card, Button, message } from 'antd';
import GooglePlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete'
import { DataStore } from "aws-amplify";
import { Restaurant } from "../../models";
import { useRestaurantContext } from "../../contexts/RestaurantContext";
const Settings = () => {
    const [name, setName] = useState("");
    const [address, setAddress] = useState(null);
    const [coordinates, setCoordinates] = useState(null);

    const {sub, restaurant, setRestaurant} = useRestaurantContext();

    const getAddressLatLng = async (address) => {
        setAddress(address);
        const geocodedByAddress = await geocodeByAddress(address.label);
        const latLng = await getLatLng(geocodedByAddress[0]);
        setCoordinates(latLng);
    };

    useEffect(() => {
        console.log('There is a restaurant 👨‍🍳', restaurant);
      if (restaurant) {
        setName(restaurant.name);
        setCoordinates({lat: restaurant.lat, lng: restaurant.lng})
      }
    }, [restaurant]);

    const onSubmit = async () => { 
        if (!restaurant) {
            await createNewRestaurant();
        }else{
            await updateRestaurant();
        }
        
     }    

    const createNewRestaurant = async () => {
        const newRestaurant = await DataStore.save(new Restaurant({
            name,
            image: "https://scontent-mia3-1.cdninstagram.com/v/t51.2885-15/296108637_3087558878174096_6824026744342648185_n.webp?stp=dst-jpg_e35&_nc_ht=scontent-mia3-1.cdninstagram.com&_nc_cat=108&_nc_ohc=kNKZqwZFGeUAX8ohRUL&tn=y7uTeD1Am3LBnoh8&edm=ALQROFkBAAAA&ccb=7-5&ig_cache_key=Mjg5Mzk1MjIxMzg1Mjg2NTkzMg%3D%3D.2-ccb7-5&oh=00_AT9RFO5PK--skal3xtaKU3CF5xRTuf5H8ZQcXx4ltIAzUQ&oe=631C4799&_nc_sid=30a2ef",
            deliveryFee: 0,
            minDeliveryTime: 15,
            maxDeliveryTime: 120,
            address: address.label,
            lat: coordinates.lat,
            lng: coordinates.lng,
            adminSub: sub
        }));

        setRestaurant(newRestaurant);
        message.success('Restaurant has been created!')
    }

    const updateRestaurant = async () => { 
        const updatedRestaurant = await DataStore.save(
            Restaurant.copyOf(restaurant, (updated) => {
                updated.name = name;
                if (address) {
                    updated.address = address.label;
                    updated.lat = coordinates.lat;
                    updated.lng = coordinates.lng;
                }
            })
        )

        setRestaurant(updatedRestaurant);
        message.success("Restaurant updated")
     }

    return (
        <Card title="Settings" style={{ margin: 20 }}>
            <Form layout='vertical' wrapperCol={{ span: 8 }} onFinish={onSubmit}>
                <Form.Item label="Restaunrant Name" required>
                    <Input placeholder='Enter restaurant name here' value={name} onChange={(e) => setName(e.target.value)} />
                </Form.Item>

                <Form.Item label="Restaurant Address" >
                    <GooglePlacesAutocomplete
                        apiKey="AIzaSyCo88DfUDZWtQQEDaysJVz9lsPDHz-Vz2A"
                        selectProps={{
                            value: address,
                            onChange: getAddressLatLng,
                        }}
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
            <span>{coordinates?.lat} - {coordinates?.lng}</span>

        </Card>
    )
}

export default Settings