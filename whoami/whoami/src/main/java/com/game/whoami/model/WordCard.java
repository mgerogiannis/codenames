package com.game.whoami.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.io.Serializable;

@Entity
public class WordCard implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String text;

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
}
