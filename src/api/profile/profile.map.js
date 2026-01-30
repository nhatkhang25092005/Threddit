export const mapPresignBackgroundImage = (data) => ({
  contentType:data.contentType,
  contentLength:Number(data.contentLength)
})

export const mapConfirmBackgroundImage = (key) => ({
  key:key
})

export const mapPresignAvatar = (data) => ({
  contentType:data.contentType,
  contentLength:Number(data.contentLength)
})

export const mapConfirmAvatar = (data) => ({
  key:data.key
})

export const mapUpdateProfile = (data) => ({
  displayName: data.displayName ? data.displayName : undefined,
  gender:data.gender ? data.gender : undefined,
  dateOfBirth:data.birth ? data.birth : undefined,
  educationalLevel:data.educationalLevel ? data.educationalLevel : undefined,
  relationshipStatus: data.relationshipStatus ? data.relationshipStatus : undefined
})

export const mapS3Aws = (data)=> ({
  file:data.file,
  type:data.type
})