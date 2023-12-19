import React, { useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Button, MenuItemProps, Spin, TableDataItem, Table as TableRaw, withTableActions, Icon, Modal } from '@gravity-ui/uikit';
import CirclePlus from '@gravity-ui/icons/CirclePlus';

import { FeatrueFlag } from '../../models';
import { Form } from '../Form';
import { API_ENDPOINT } from '../../constants';

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
    const [modalData, setModalData] = useState<{ id?: number } | null>(null);
    const history = useHistory();

    const fetchData = useCallback(async () => {
        setLoading(true)
        const { data } = await axios.get(API_ENDPOINT)
        setData(data)
        setLoading(false);
    }, []);

    const onSubmit = async (data: Partial<FeatrueFlag>) => {
        const params = data.id
            ? { method: 'patch', url: `${API_ENDPOINT}/${data.id}` }
            : { method: 'post', url: API_ENDPOINT }

        await axios({ ...params, data });

        fetchData();
        setModalData(null);
    }

    const tableData = useMemo(() => data?.map(({ id, name, value }) => ({
        id, name, value: String(value)
    })), [data])

    const getRowActions = () => {
        return [
            {
                text: 'Edit', handler: async ({ id }: TableDataItem) => {
                    setModalData({ id });
                },
            },
            {
                text: 'Remove', handler: async ({ id }: TableDataItem) => {
                    await axios.delete(`${API_ENDPOINT}/${id}`);

                    fetchData();
                }, theme: 'danger' as MenuItemProps['theme']
            },
        ];
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className='list'>
            <Modal open={Boolean(modalData)} onClose={() => setModalData(null)}>
                {modalData && <Form
                    title={modalData.id ? 'Edit feature flag' : 'Create feature flag'}
                    //@ts-ignore
                    onSubmit={onSubmit}
                    initialData={modalData?.id ? data.find(({ id }) => id === modalData.id) : undefined}
                />}
            </Modal>
            <h2>Feature flags</h2>
            {loading ?
                (
                    <Spin size='xl' />
                ) : (
                    <div>
                        <Table data={tableData} columns={tableMeta} getRowActions={getRowActions} onRowClick={({ id }) => history.push(`/${id}`)} />
                        <Button className={'add-button'} onClick={() => setModalData({})}>
                            <Icon data={CirclePlus} size={16} />
                            Add
                        </Button>
                    </div>)
            }
        </div >
    );
}