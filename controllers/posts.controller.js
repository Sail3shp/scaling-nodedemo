import { pool } from "../config/db.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { ApiRespose } from "../utils/apiResponse.js";

export const getPosts = asyncHandler(async (req, res) => {
    const data = await pool.query('select * from posts')
    res.status(200).json(
        new ApiRespose(200,data.rows)
    )
})

export const getPostById = asyncHandler(async(req,res) => {
    const {id} = req.params
    const postId = Number(id)
    if(Number.isNaN(postId)) {
        throw new apiError(400,'please enter a number',)
    }
    const data = await pool.query('select * from posts where id = $1',[id])
    if(data.rowCount === 0){
        throw new apiError(404,'post not found')
    }
    res.status(200).json(
        new ApiRespose(200,data.rows[0])
    )
})

export const createPosts = asyncHandler(async (req, res) => {
    const { title, content } = req.body
    if(!title || !content){
        throw new apiError(400,'please enter both fields')
    }
    const data = await pool.query('insert into posts(title,content) values($1,$2) Returning *', [title, content])
    res.status(201).json(
        new ApiRespose(201,data.rows[0],'post has been created')
    )
})

export const updatePosts = async (req, res) => {
    const { title, content } = req.body
    const { id } = req.params
    try {
        const data = await pool.query('update posts set title = $1 ,content = $2 where id = $3 returning *', [title, content, id])
        if (data.rowCount === 0) {
            return res.status(404).json({
                status: "fail",
                message: "Post not found",
            });
        }
        res.status(200).json({ status: 'success', data: data.rows })
    } catch (error) {
        console.log('error in update')
        res.status(500).json('internal server error')
    }
}

export const deletePosts = async (req, res) => {
    const { id } = req.params
    try {
        const data = await pool.query('delete from posts where id = $1 returning * ', [id])
        if (data.rowCount === 0) {
            return res.status(404).json({
                status: "fail",
                message: "Post not found",
            })
        }
        res.status(200).json({
            status:"success",
            data: data.rows
        })
    } catch (error) {
        console.log('error in update')
        res.status(500).json('internal server error')
    }
}