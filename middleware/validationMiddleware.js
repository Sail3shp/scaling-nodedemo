import z from "zod"
export const validate = (schema) => (req,res,next) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params
      })  
      next()
    } catch (e) {
        let formattedError = {}
        if(e instanceof z.ZodError){
            e.issues.map((issue) => formattedError[issue.path[1]] = issue.message)
            console.log(formattedError,e.issues)
            return res.status(400).json({
                status:'error',
                message:'validation failed',
                errors: formattedError  
            })
        }
        next(e)
    }
}