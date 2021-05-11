package com.game.whoami.repo;

import com.game.whoami.model.WordCard;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WordCardRepo extends JpaRepository<WordCard, Integer> {
}
