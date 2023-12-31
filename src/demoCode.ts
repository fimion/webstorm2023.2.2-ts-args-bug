

type OptionsObject = {
    option1?: number;
    option2?: string;
}

type DataObject = {
    name:string,
}

type ReturnDataObject<T> = {
    success: boolean;
    code: number;
    data: T;
}




export type GeneratedFetch<T, Args extends any[] = any[]> = (...args:Args)=>Promise<ReturnDataObject<T>>

function createWrapperFunction<
    T_FetchType,
    T_FetchMethod extends GeneratedFetch<T_FetchType> = GeneratedFetch<T_FetchType>,
>(myFunc: T_FetchMethod){

    // This ultimately sets up a reactive wrapper around our fetch function
    async function fetch(...args:Parameters<typeof myFunc>){
        // Pretend we do some auth handling etc here
        const response = await myFunc(...args);
        // Do some checking of the response here.
        return response;
    }

    return {
        fetch,
    }
}


/**
 * Our original function. Pretend it's a data fetcher. This code is generated by a process.
 * @param arg1
 * @param arg2
 * @param arg3
 */
async function myGeneratedFetchMethod(arg1: number, arg2: DataObject, arg3?:OptionsObject){
    const prom = new Promise<[
        number,
        DataObject,
        OptionsObject|undefined
    ]>((res)=>{res([arg1, arg2, arg3])})
    console.log(...(await prom));
    return {
        success: true,
        code: 201,
        data: arg2,
    } as ReturnDataObject<DataObject>;
}

const myFetchHandler = createWrapperFunction<DataObject, typeof myGeneratedFetchMethod>(myGeneratedFetchMethod)

await myFetchHandler.fetch(1, {name:'test'}, {})
