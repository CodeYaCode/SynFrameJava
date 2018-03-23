/*
 * $Header: Player.java
 * $Revision: 1.0.0.0
 * $CreateDate: 2018年3月23日
 * $ModifyDate: 2018年3月23日
 * $Owner: LiuChen
 * 
 * Copyright (c) 2017-2027 ShangHai ChenJxx Co. Ltd.
 * All Right Reserved.
 */
package com.frame.domain;

/**
 * Player.java
 * @author LiuChen
 * @version 1.0.0.0 2018年3月23日
 */
public class Player {

    private int playerId;
    
    private int hp;
    
    private boolean dead;
    
    public Player(int playerId) {
        this.playerId = playerId;
        this.hp = 100;
        this.dead = false;
    }

    public int getPlayerId() {
        return playerId;
    }

    public void setPlayerId(int playerId) {
        this.playerId = playerId;
    }

    public int getHp() {
        return hp;
    }

    public void setHp(int hp) {
        this.hp = hp;
    }

    public boolean isDead() {
        return dead;
    }

    public void setDead(boolean dead) {
        this.dead = dead;
    }
}
