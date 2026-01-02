export default async function createWithLoading(task, plugin){
  if(typeof task !== 'function'){ throw new Error('task in withLoading expects a function') }
  if(typeof plugin !== 'function'){throw new Error('plugin in withLoading expected a function')}
  try{
    plugin(true)
    const res = await task()
    return res
  }
  catch(e){
    console.log(e)
    console.error("Error occurs in createWithLoading(task, plugin):", e)
    throw e
  }
  finally{plugin(false)}
}