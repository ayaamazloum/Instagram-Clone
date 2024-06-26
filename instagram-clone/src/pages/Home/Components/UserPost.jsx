import sendRequest from "../../../core/tools/remote/request"
import { requestMehods } from "../../../core/enums/requestMethods"
import { useEffect, useState } from "react";
import UserComment from "./UserComment";

const UserPost = ({ post, userId }) => {
    const [likes, setLikes] = useState();
    const [liked, setLiked] = useState();
    const [comment, setComment] = useState('');
    const [viewComments, setViewComments] = useState(false);

    const formatDate = (inputDate) => {
        const date = new Date(inputDate);
        const formattedDate = date.toLocaleString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
          hour: 'numeric',
          minute: 'numeric'
        });
        return formattedDate;
    }

    const unlike = async (postId) => {
        try {
            const res = await sendRequest(requestMehods.POST, 'unlike', {'post_id': postId});
            if (res.data.status ==='success') {
                setLikes(likes - 1);
                setLiked(false);
            }
        } catch (e) { console.error(e); }
    }

    const like = async (postId) => {
        try {
            const res = await sendRequest(requestMehods.POST, 'like', {'post_id': postId});
            if (res.data.status ==='success') {
                setLikes(likes + 1);
                setLiked(true);
            }
        } catch (e) { console.error(e); }
    }

    const addComment = async (postId) => {
        try {
            const res = await sendRequest(requestMehods.POST, 'comment', {
                'post_id': postId,
                'comment' : comment
            });
            if (res.data.status === 'success') {
                setComment('');
            }
        } catch (e) { console.error(e); }
    }

    useEffect(() => { 
        post.likes.some(like => like.user_id === userId) ? setLiked(true) : setLiked(false);
        setLikes(post.likes.length);
    }, []);

    return (
        <div className="post flex column gap-10">
            <div className="flex row start-center gap-20">
                <img className="post-profile-pic" src={"http://127.0.0.1:8000/profile_pictures/" + post.user.profile.profile_picture} />
                <p className="semi-bold">{post.user.username}</p>
                <p className="xxsm-text light-text">{formatDate(post.created_at)}</p>
            </div>
            <img className="post-image border semi-rounded" src={"http://127.0.0.1:8000/posts_images/" + post.image} />
            <div className="flex gap-10">
                {liked ? 
                    <img
                        className="post-icon"
                        onClick={()=> {unlike(post.id)}}
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEtUlEQVR4nO2cTWicRRzG/xqNtZJm3+d5kyVSCWg8aFERFbyIivhFvXoRwYMXb4KC1oNoqSjUr4NfLYgUqSjBqtTWqxcRKsnOf5MYtSDxowpWav2uaauvzLrV2lqbj3nf+e/u/OCBPWXmeXZmMjM7MyKJRCKRSCQSiUQikUgkEokFsXts7AxHXuPI9Qq8qeSsI79T8qADDijwtSOnFXhFs+yeZpZdFCraqVrtYiXvbf1tcqZVFnDAkfPtOnzo6+Tr5uvo69pxX6vm+aUKbFZyv5LFYuSAjx15vxscrC223KnBwUyBBxzwyaLL9eEDm3zdxTqNWu0SR77jyD8Wa1SPD/xH39omRkZWnqxcrdfPUnKDA35adrm+7sCOkL0rGHOjoyuUfErJQ8s1qscb/8IBN5yobM2ym5TcE7pc78UBj5sZUiaHhsYUcCUYLY5pZRsLkVOPlOs/O+CJEL3nJD2rMT00dF7ckMnLHfBNmUb133rj/dWrz2z/k32tqnIdua8JXBkl5AZ5hR9HKwy5aOu9tiot13udyvPLYgwXeyOEXMSU771Tw8PnVhJyq9sCjdimNVbYZNMPX6UH7cgnY5vV2AI2lhqyn1v6VV10o4yuQ37NUFrQfjFiwGRhQQ7YXkrIfmla9pxVO0g+i1JadXvvIrpBtSTgueAzjaVsEHW7HLlvRqQ/WNCOvDa2KTWqZp5fFTLo9bENqVUBDwULWoG3ohuiTTlyW7igydnYhtSuZoIF7Qd9A4YKo/o2ZNDzBgwVFuWA31LQ7LCgffeI3XLU8NZpuBYNTMQ2pHa1K2TQLxswVBjVlmBBN4A7DBgqLMqRtwcLWuv1YUf+HtuUGlMrk3p9WELigMnYxtSagA8kNEqui26MtuTI+4IHPbNqFRzwc2xzakXAL7sGBihlkDb/+U9rBp6XsnBZtib9nMXWz1iTwAWlBd0Ku8KjWGpVwFYpm+ksO8ePTz0c8q+TtdqoVIEjH41umNG0QariI3LAX1Xowdb8lfcuVaJ5fkt046xWLs/XVhry32GTW3omZPJFicVElg0q+XkPhPzlUi4vBaVJXqfk4dhhaHk67K/HiQUUeNBAIEVJWidWKEROaV/YLLpJDnjbexNL+MuUDvg0djgaTnN+I00s0gAu7JLDkD/4K85iGc2yG8u42KnV6WADuF46AQXuNBBYsUTdJZ2EAx4zEFqxSD0inUZ7JrLJQHjFQuSAF6RTad/XftV8yOS2cZE+6WQmRE5XYGfsME8oYIevo3QDMyL9Jhc0wE7/BIZ0EzMi/Y583cxwAWw38xZHaMZF+iyc4/O/e74rcpp0M+MifUq+FHG42Nr1IR8z9Xs2Qsibj37FpnfCJp+pMOinze3EVUkTuLvMk6r+sIsjH47t0wQOuLX14GD4kOcb5G2x/ZnC/XUNOtgWq38wsJHnV8f2ZRKXZWuU/CxA0HvM7yfHZpI8ezlvNvmLTRN5PhLbR0cwNzq6YikLG78QWcgTm4mj8FOx1mOwC5iRHJlZ9PT0bbm4PF+r5Pf/E/T+ZpbdHLueXUEjz8/37839R8izpR8I7zUmRkZWtt7c8y9IAnv95zQeJxKJRCKRSCQSiUQikUhIFP4EXQXpqZUyzF4AAAAASUVORK5CYII=" />
                    : <img
                        className="post-icon"
                        onClick={()=> {like(post.id)}}
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAAGFklEQVR4nO2dW4hWVRTHf+M4kzkO5ZRF2AXMS1ZWVHQxoulq+laaZJQvQREE1oNaRNFlSLsTkXaDxMJbKqlQmEVOGdGDmdpFmcqUeqgxu6uZzolNa+hzmJm99vn2Oft837d/sGFQ56z/Wuey176sLUQikUgkEolEIpFIJBKJRCJ+GAJMAuYCa4BtwB7gAPCP/NwBrAWeBm4Ajs0w+MOAqWJrrdjeI1oOyM9fAauBOcBE8aGiqBPhy4D9QOLYDgLrgWlAgwc9DXKtdrm2q559wFLgWvGt0JgneEsKJ5M+2vfAvUBTCi3md+4DfvCo5zPgegrIaOA9j44mPdpOYLKDninArgz1vAOMpCDcDPyRobNJSXsTGNqPlhZgVU5afpdPWzDqpKNKcm47gHN70XM+8F0APW0h+gZjcH4AZ5OSp+/KEj1X5/gW9tbm5X0TQjz5SS/ZSStwecpsK4s3Ibdvvqu4jcADErDTJEM5EhgOTAAeAramuO6v0lx/70vgEUmXTxQtTaKtVbRuTHHdG/PIdrSvehfwBjDG4frnAYuAQxk8oUbPSuAiBz1G+3L5XY2N34BTyRBtqvmto6M9uSDlE9hX+xy4jPSMl85fY8uMsDMbZGkEtHuaTqgH7gT+KiPwpm+Y5WlEPUx809i9Ds/UKUe4RmCjZ9tnA9+kHEVf6FlLo/ImbPKdFU1SfnaymkhrkVdbG/wPgOMz0jJMfLVpMMmFN5ZZjHWV+c3XYD4jSxSOm5nMQWTLeEXHvNiXsWZFnm2ynTyoB17tR8ciT997DSssMdkLDPZhaKLi6XdJNctlgDxdPXUslxuUF2MVb+M1PgzNtRgx6WLeNPboE0x6fEQAHZsssXnUh5E1FiP3E4Zm4AtgO3B0IA0PKmZvy2a7xYgZuodirLRQXGGJjVneLJufLUZGUbuMscSm04eRvy1GKm7R2iNDLLEx2WPmNyDNem210JzHDei0GBlB7TLKEpsffRjZbDFiVqNqlQmKXRRls7QoK0EFZE4e0xH3WIx8TO3yiSU2s30YuVgxFVGLqehoxYScWVgqm4GKsYCXIXeF8ZglJrsldl54RdHbN9VY/t9picnLPg22WoyZNpPaYbYiHt6naD5VvAVmYFLtNCuefhMr70xT3PXHqX6eCrU/qF6xOG4KHcZRvZwhhRz9xWCHz863JzMUd79dVq2qjXpgg8J/E6NMV6K2KUTcTfUxS+F3Rx4rc5OUG2dDLpT45kzlBmATm1xYrRCz1deugMA0ydZGm7+mMCQ3RshTbhP1OpXPAoWf+0NMx8xUCDPtViqX25U+BhmEmkznXYW4A2XuTA7FJcrvfnvO+5EOY7hMOtlE7s5637xnTpGRvc2vX4CTCcxk5Wu6JeD+HReGOlTruJTOZso8peANBc+MBgMfKX0xPhcGsyH2faXwdYG2EWp8eMvhQfJdB1E2xzgUUqwI2XH1kVBotr53V+0fR0Ex1Sx/Kh2ZTzEwlSwvKDXvlYLwQjPFocqxLbRYh5rnQ+JbRXCH0qlEtr+H4mEHnXdRYbQ5OPd8zqX+xtYzDvpMUXfFUScL01onX8ppHcHoes5B18JKOKipLwZKdbrW2QUZZ0f1ElCtnpVZrm7lRaPjGT5LMiq0a1Bssyxtq4qY6+d1E9YBR3nex6MdZJn2dkEHi2XfBFu9WdJj7ugkD3ZPUGypKW1rc6gzDsYgx5uwU5YD0zLO8ey4NdUc/G4GKleZkpLTscyRkWkK6FzOElqcY5F3cAZI2pkomymTusXh+tMVpVUhUuBCUQc84RCkRP59f2mq+bsnU1yzYvN8H8xwPCFrfR+zkS1ynqf2Ol1SaB3hv5UlzS6L7rZLjjfr5izHM4XM5+mmGPnDaZU1Vm0Q90m/MNVhCry7U/dyiEY1cjrwteNnRHugXiLXNjYi/dCS0TnUHxZ5JauIY4VnPQb/xVrK8X1ym2I/fn/toK9S0VrmUuCnFME3/xvGVaHFVwsjFUcmlLbNRTrfv1oYpJy+WFjwzV8Vz/Q+TtPdl3V5UOR/zpFyoO7gd8ifRXKu131NWi3UJ0cikUgkEolEIpFIJBKJRKhs/gUTCr+D41th1AAAAABJRU5ErkJggg==" />
                }
                <img
                    onClick={()=>{setViewComments(true)}}
                    className="post-icon"
                    src="data:image/png;base64,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" />
                <img className="post-icon" src="data:image/png;base64,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" />
            </div>
            <p className="semi-bold xsm-text">{likes} like{ likes > 1 && 's' }</p>
            <div className="flex gap-20">
                <p className="semi-bold">{post.user.username}</p>
                <p>{post.caption}</p>
            </div>
            <div className="flex space-between">
                <input
                    value={comment !== '' ? comment : ''}
                    onChange={(e) => {setComment(e.target.value)}}
                    className="xsm-text"
                    type="text"
                    placeholder="Add a comment..." />
                {comment !== '' &&
                    <p onClick={()=>addComment(post.id)} className="secondary-text xsm-text pointer">Post</p>}
            </div>

            {viewComments &&(
                <div className='popup flex center'>
                    <div className='popup-content semi-rounded'>
                        <div className='popup-header flex row space-between gap-20'>
                            <div className='popup-title'>Comments</div>
                            <img
                                onClick={() => { setViewComments(false) }}
                                className="close-popup-icon"
                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAACPklEQVR4nO3bS0oDURCF4eMuxIEIugDfxq6gLs+Z23PiDnzF9DwSyAUJJm0Hu++pqvNDZiJVfl7TaVpAKaWUUkoppZRSSql8HSNvxyDrEUAL4AH5MgBfAJ4A7IEEY7F6ZUOxFUbZvzrKT4xsKLaGUR3lN4wsKLYBoxrKNozoKNaBMTrKCYD5HwZarL5uijhNe+6+/FmNUvPH35JIJ8XYd86EYl52zYBi3naMjGJed4uIYt53ioRiUXaJgGIBdgiDYo5nD4diDmcOi2KOZg2PYg5mTINixLOlQzHCmdKiGNEsyI5iBDNQVRPFhMGDYsLgQTFh8KCYMHhQTBg8KCYMHhQTBg+KCYMHxYTBg2LC4HpKcJ70aUrak7LQvSlfKG2GG4VeUFph8KC0wuBBaYUxbI1AeGr0J4unRm/qPDW67OWp0QdDnxhz3ToZtlsAs56XtgyPGIXsdgeMklCIMEpCqYRxv+V7CYUIoyQUIoySUHp2AeB9IIySUAbCuMPuCYUIoySUf8CYAZjg/xLKWucVMUpC+YHxVhmjlB6lD8bnwBjpURgx0p4UZox0KH0xbirOGh7lzBFGeBSPGGFRPGOEQ4mAEQYlEoZ7lCXGaw+Ma/ip8YZyGhjDHUoGDDcofTA+nGPQo/R5A1/ear9E3n9EnYwx1CGAl0QnY9eT8gzgACPVhbLEuELcmg6UUTG6UKJjdKFUwdiEkgVjE0pVjHWUbBjrKBQYpaPV1VfWJgD2aw+hlFJKKaWUUkoppRRG7Bvth+BAB0h1gQAAAABJRU5ErkJggg==" />
                        </div>
                        <div className='popup-body'>
                            <div className='flex column center gap-20 mt-20'>
                                {post.comments.length > 0 && 
                                    post.comments.map((comment) => {
                                        return (<UserComment
                                            key={comment.id}
                                            comment={comment}
                                            formatDate={formatDate}
                                        />);
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default UserPost