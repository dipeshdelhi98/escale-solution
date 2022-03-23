import { NextFunction, Response } from 'express'
import Busboy from 'busboy'

declare namespace multipartFileParser {
  export interface File {
    allowedMimesTypes?: string[]
  }

  export interface Busboy {
    headers?: any
    highWaterMark?: number
    fileHwm?: number
    defCharset?: string
    preservePath?: boolean
    limits?: {
      fieldNameSize?: number
      fieldSize?: number
      fields?: number
      fileSize?: number
      files?: number
      parts?: number
      headerPairs?: number
    }
  }

  export interface AllowAllOptions {
    fileOptions?: File
    busboyOptions?: Busboy
  }
}

const allowedMethods = ['POST', 'PUT']
const multipartFileParser = ({ fileOptions, busboyOptions } = {} as multipartFileParser.AllowAllOptions) => [
  (req: any, res: Response, next: NextFunction) => {
    const type = req.headers['content-type']

    if (allowedMethods.includes(req.method) && type && type.startsWith('multipart/form-data')) {
      let busboy = null

      try {
        busboy = new Busboy(Object.assign({ headers: req.headers }, busboyOptions))
      } catch (error) {
        next()
        return
      }

      req.files = []

      busboy.on('field', (fieldname, value) => {
        if (!req.body) {
          req.body = {}
        }

        req.body[fieldname] = value
      })

      busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
        let fileBuffer = Buffer.from('')

        file.on('data', data => {
          fileBuffer = Buffer.concat([fileBuffer, data])
        })

        file.on('end', () => {
          const options = Object.assign({ allowedMimesTypes:  [''] }, fileOptions)

          if (!fileOptions || options.allowedMimesTypes.includes(mimetype)) {
            req.files.push({
              fieldname,
              originalname: filename,
              encoding,
              mimetype,
              buffer: fileBuffer,
            })
          } else {
            res.status(400).send('Invalid file type')
          }
        })
      })

      busboy.on('finish', () => {
        next()
      })

      busboy.end(req.rawBody)
    } else {
      next()
    }
  },
]

export default multipartFileParser()
export { multipartFileParser }
