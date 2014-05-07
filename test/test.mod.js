var BH = require('../lib/bh');
require('chai').should();

describe('ctx.mods()', function() {
    var bh;
    beforeEach(function() {
        bh = new BH();
    });
    it('should return mods', function() {
        bh.match('component', function(ctx) {
            ctx.mods().type.should.equal('button');
        });
        bh.apply({ block: 'component', mods: { type: 'button' } });
    });
    it('should return boolean mods', function() {
        bh.match('component', function(ctx) {
            ctx.mods().disabled.should.equal(true);
        });
        bh.apply({ block: 'component', mods: { disabled: true } });
    });
    it('should set mods', function() {
        bh.match('component', function(ctx) {
            ctx.mods({ type: 'button', disabled: true });
        });
        bh.apply({ block: 'component' }).should.equal('<div class="component component_type_button component_disabled"></div>');
    });
    it('should not override user mod', function() {
        bh.match('component', function(ctx) {
            ctx.mods({ type: 'button' });
        });
        bh.apply({ block: 'component', mods: { type: 'link' } }).should.equal('<div class="component component_type_link"></div>');
    });
    it('should not override later declarations', function() {
        bh.match('component', function(ctx) {
            ctx.mods({ type: 'control' });
        });
        bh.match('component', function(ctx) {
            ctx.mods({ type: 'button', disabled: true });
        });
        bh.apply({ block: 'component' }).should.equal('<div class="component component_type_button component_disabled"></div>');
    });
    it('should override later declarations with force flag', function() {
        bh.match('component', function(ctx) {
            ctx.mods({ type: 'control' }, true);
        });
        bh.match('component', function(ctx) {
            ctx.mods({ type: 'button' });
        });
        bh.apply({ block: 'component' }).should.equal('<div class="component component_type_control"></div>');
    });
    it('should override user declarations with force flag', function() {
        bh.match('component', function(ctx) {
            ctx.mods({ type: 'button' }, true);
        });
        bh.apply({ block: 'component', mods: { type: 'link' } }).should.equal('<div class="component component_type_button"></div>');
    });
});

describe('ctx.mod()', function() {
    var bh;
    beforeEach(function() {
        bh = new BH();
    });
    it('should return mod', function() {
        bh.match('component', function(ctx) {
            ctx.mod('type').should.equal('button');
        });
        bh.apply({ block: 'component', mods: { type: 'button' } });
    });
    it('should return boolean mod', function() {
        bh.match('component', function(ctx) {
            ctx.mod('disabled').should.equal(true);
        });
        bh.apply({ block: 'component', mods: { disabled: true } });
    });
    it('should set mod', function() {
        bh.match('component', function(ctx) {
            ctx.mod('type', 'button');
        });
        bh.apply({ block: 'component' }).should.equal('<div class="component component_type_button"></div>');
    });
    it('should set boolean mod', function() {
        bh.match('component', function(ctx) {
            ctx.mod('disabled', true);
        });
        bh.apply({ block: 'component' }).should.equal('<div class="component component_disabled"></div>');
    });
    it('should not override user mod', function() {
        bh.match('component', function(ctx) {
            ctx.mod('type', 'button');
        });
        bh.apply({ block: 'component', mods: { type: 'link' } }).should.equal('<div class="component component_type_link"></div>');
    });
    it('should not override later declarations', function() {
        bh.match('component', function(ctx) {
            ctx.mod('type', 'control');
        });
        bh.match('component', function(ctx) {
            ctx.mod('type', 'button');
        });
        bh.apply({ block: 'component' }).should.equal('<div class="component component_type_button"></div>');
    });
    it('should override later declarations with force flag', function() {
        bh.match('component', function(ctx) {
            ctx.mod('type', 'control', true);
        });
        bh.match('component', function(ctx) {
            ctx.mod('type', 'button');
        });
        bh.apply({ block: 'component' }).should.equal('<div class="component component_type_control"></div>');
    });
    it('should override user declarations with force flag', function() {
        bh.match('component', function(ctx) {
            ctx.mod('type', 'button', true);
        });
        bh.apply({ block: 'component', mods: { type: 'link' } }).should.equal('<div class="component component_type_button"></div>');
    });
});
