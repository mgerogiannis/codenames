package com.game.whoami.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class CardCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String text;
    private String image;
    private int imageid;

    public int getId() {
        return id;
    }

    public void setId(int id){
        this.id = id;
    }

    public String getText(){
        return text;
    }

    public void setText(String text){
        this.text = text;
    }

    public String getImage(){
        return image;
    }

    public void setImage(String image){
        this.image = image;
    }

    public int getImageId(){
        return imageid;
    }

    public void setImageId(int imageid){
        this.imageid = imageid;
    }

}
