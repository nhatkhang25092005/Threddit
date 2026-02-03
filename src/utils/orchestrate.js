export async function orchestrate({
  service,
  onStart = [],
  onSuccess = [],
  onError = []
}) {
  try {
    // start phase
    onStart.forEach(fn => fn())

    const response = await service()
    console.log(response)

    // success phase
    onSuccess.forEach(fn => fn(response))

    return response
  } catch (error) {
    // error phase
    console.log(error)
    onError.forEach(fn => fn(error))
    throw error
  }
}
