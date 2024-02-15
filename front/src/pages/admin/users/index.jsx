import React from 'react';
import Head from 'next/head';

import DataTable from '@/components/DataTable';
const UsersPage = () => {
    const itemPerPage = 10;
    return (
        <>
            <Head>
                <title>Coursia - Users table</title>
            </Head>
            <main>
                <DataTable
                    endpoint={'https://localhost/users/'}
                    title="Users table"
                    itemsPerPage={itemPerPage}
                    selectableColumns={[
                        'id',
                        'firstname',
                        'lastname',
                        'email',
                        'roles',
                    ]}
                />
            </main>
        </>
    );
};

export default UsersPage;
