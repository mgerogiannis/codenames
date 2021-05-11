package com.game.whoami.controllers;


import com.game.whoami.model.CardCategory;
import com.game.whoami.service.CardCategoryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/cardcategory")
public class CardCategoryController {
    private final CardCategoryService cardCategoryService;

    public CardCategoryController(CardCategoryService cardCategoryService) {
        this.cardCategoryService = cardCategoryService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<CardCategory>> getAllCardCategories(){
        List<CardCategory> cardCategoryList = cardCategoryService.findAllCardCategories();
        return new ResponseEntity<>(cardCategoryList, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<CardCategory> addCardCategory(@RequestBody CardCategory cardCategory){
        CardCategory newCardCategory = cardCategoryService.addCardCategory(cardCategory);
        return new ResponseEntity<>(newCardCategory, HttpStatus.CREATED);
    }
}
