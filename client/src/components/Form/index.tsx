import React, { useState } from 'react';
import { Button, Checkbox, TextInput } from '@gravity-ui/uikit';
import { FeatrueFlag } from '../../models';

import './Form.scss';
import { ServicesSelect } from '../ServicesSelect/ServicesSelect';

interface SubmitData extends Partial<Omit<FeatrueFlag, 'services'>> {
    services: string[]
}

export interface FormProps {
    title: string;
    initialData?: Partial<FeatrueFlag>
    onSubmit: (data: SubmitData) => void;
}

export function Form({ title, initialData, onSubmit }: FormProps) {
    const { name: initialName = '', value: initialValue = false, services: initialServices=[], id } = initialData || {}
    const [name, setName] = useState(initialName);
    const [value, setValue] = useState(initialValue);
    const [services, setServices] = useState(initialServices.map(({slug}) => slug));

    return (
        <form className="form">
            <h3>{title}</h3>
            <div className='fields'>
                <TextInput label="name" value={name} onUpdate={setName} />
                <Checkbox checked={value} content="active" onUpdate={setValue} />
                <ServicesSelect onUpdate={setServices} selected={services}/>
            </div>
            <Button type="submit" onClick={(e) => {
                e.preventDefault();
                onSubmit({ name, value, id, services })
            }}>Send</Button>
        </form>
    );
}