import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { MenuItemProps, Spin, TableDataItem, Table as TableRaw, withTableActions } from '@gravity-ui/uikit';
import { FeatrueFlag } from '../../models';

import './List.scss';

const Table = withTableActions(TableRaw);
const tableMeta = [
    { id: 'id' },
    { id: "name" },
    { id: "value" }
];

export function List() {
    const [data, setData] = useState<FeatrueFlag[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchData = useCallback(async () => {
        setLoading(true)
        const response = await fetch('/api/feature-flags');

        setData(await response.json() as unknown as FeatrueFlag[]);
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchData();
    }, []);

    const tableData = useMemo(() => data?.map(({ id, name, value }) => ({
        id, name, value: String(value)
    })), [data])

    const getRowActions = () => {
        return [
            {
                text: 'Remove', handler: async ({ id }: TableDataItem) => {
                    await fetch(`/api/feature-flags/${id}`, { method: "DELETE" });

                    fetchData();
                }, theme: 'danger' as MenuItemProps['theme']
            },
        ];
    }
    return (
        <div className='list'>
            <h2>Feature flags</h2>
            {loading ?
                <Spin size='xl' />
                : <Table data={tableData} columns={tableMeta} getRowActions={getRowActions} />}
        </div>
    );
}