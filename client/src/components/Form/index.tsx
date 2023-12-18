import React, { useState } from 'react';
import { Button, Checkbox, TextInput } from '@gravity-ui/uikit';
import { FeatrueFlag } from '../../models';

import './Form.scss';

export interface FormProps {
    title: string;
    initialData?: Partial<FeatrueFlag>
    onSubmit: (data: Partial<FeatrueFlag>) => void;
}

export function Form({ title, initialData, onSubmit }: FormProps) {
    const { name: initialName = '', value: initialValue = false, id } = initialData || {}
    const [name, setName] = useState(initialName);
    const [value, setValue] = useState(initialValue);

    return (
        <form className="form">
            <h3>{title}</h3>
            <div className='fields'>
                <TextInput label="name" value={name} onUpdate={setName} />
                <Checkbox checked={value} content="active" onUpdate={setValue} />
            </div>
            <Button type="submit" onClick={(e) => {
                e.preventDefault();
                onSubmit({ name, value, id })
            }}>Send</Button>
        </form>
    );
}