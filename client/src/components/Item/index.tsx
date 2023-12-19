import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useRouteMatch } from 'react-router-dom';
import { API_ENDPOINT } from '../../constants';
import { Spin, Link } from '@gravity-ui/uikit';
import { FeatrueFlag } from '../../models';

import './Item.scss';

export function Item() {
    const {
        params: { id },
    } = useRouteMatch<{ id: string }>();
    const [data, setData] = useState<FeatrueFlag>();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const { data } = await axios.get(`${API_ENDPOINT}/${id}`);
            setData(data);
            setLoading(false);
        }

        fetchData();
    }, []);
    return (
        <div className='item-container'>
            <RouterLink className="breadcrumb" to='/'><Link>{"< All flags"}</Link></RouterLink>
            {loading ?
                (
                    <Spin size='xl' />
                ) : (
                    <h3>{`Feature flag ${data?.name} is ${data?.value ? 'enabled' : 'disabled'}`}</h3>
                )
            }
        </div>
    );
}