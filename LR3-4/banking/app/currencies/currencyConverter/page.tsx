import supabase from '@/core/database/database';

export default async function CurrencyConverter(): Promise<JSX.Element> {
    const { data } = await supabase.from('CurrencyTariffs').select('*');

    return (
        <>
            {JSON.stringify(data)}
        </>
    );
}
