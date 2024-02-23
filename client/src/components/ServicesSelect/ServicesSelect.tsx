import React, { useContext, useMemo } from 'react';
import { Label, Select, SelectProps } from '@gravity-ui/uikit';
import { ServicesContext } from '../../context/services';

import './ServicesSelect.scss';

export interface ServiceSelectProps {
    selected: string[];
    onUpdate: SelectProps['onUpdate']
}

export function ServicesSelect({ selected, onUpdate }: ServiceSelectProps) {
    const servicesList = useContext(ServicesContext);

    const labels = useMemo(() => 
        selected
            .map((selectedSlug) => servicesList.find(({slug}) => slug === selectedSlug)?.title)
            .filter(Boolean)
    ,[servicesList, selected])

    return (servicesList &&
        <div>
            <Select className="service-select" label="services" multiple={true} onUpdate={onUpdate}>{
                servicesList.map(({slug, title}) => <Select.Option value={slug}>{title}</Select.Option>)
            }</Select>
            {selected && (
                <div className="service-select-labels">
                    {labels.map((label) => 
                        <Label>{label}</Label>
                    )}
                </div>
            )}
        </div>
    );
}