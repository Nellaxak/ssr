//import ListRow from '@/components/ListRow/page';
//import Item from '@/types/Item'
//import http from '@/utils/http'

import { NextRequest } from 'next/server';
import Li from '@/app/Li';
export async function GET(request,response) {
    //console.log('_____________________basket',await Li.getCount())
    return new Response(JSON.stringify({
        status: 200,
        "message": await Li.getCount()
    }));
}
//export default Page