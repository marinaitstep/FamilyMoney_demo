import React from 'react'
import CatIn from './CategoriesIn'
import CatOut from './CategoriesOut'
import Modal from './Modal'

 export default function Categories() {
    return <div>
        <div class="content">
            <div class="intocontent">
            <CatIn />
            <CatOut />
            
            </div>
        </div>
        <Modal/>
    </div>
}