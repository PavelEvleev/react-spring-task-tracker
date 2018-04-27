//package com.tracker.config;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.web.servlet.FilterRegistrationBean;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.core.Ordered;
//import org.springframework.core.env.Environment;
//import org.springframework.web.cors.CorsConfiguration;
//import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
//import org.springframework.web.filter.CorsFilter;
//import org.springframework.web.servlet.config.annotation.CorsRegistry;
//import org.springframework.web.servlet.config.annotation.EnableWebMvc;
//import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
//import org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport;
//
//@Configuration
//@EnableWebMvc
//public class WebConfig extends WebMvcConfigurationSupport {
//
//    private final String externalUrl;
//
//    @Autowired
//    public WebConfig(Environment env) {
//        externalUrl = env.getProperty("frontend.external.url");
//    }
//
//    @Bean
//    public FilterRegistrationBean corsFilter() {
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//
//        CorsConfiguration configAutenticacao = new CorsConfiguration();
//        configAutenticacao.setAllowCredentials(true);
//
//        // !!! Changed from this.originPermitida to "*" (Every domain will be allowed) !!!
//        configAutenticacao.addAllowedOrigin(externalUrl);
//
//        configAutenticacao.addAllowedHeader("Authorization");
//        configAutenticacao.addAllowedHeader("Content-Type");
//        configAutenticacao.addAllowedHeader("Accept");
//        configAutenticacao.addAllowedMethod("POST");
//        configAutenticacao.addAllowedMethod("GET");
//        configAutenticacao.addAllowedMethod("DELETE");
//        configAutenticacao.addAllowedMethod("PUT");
//        configAutenticacao.addAllowedMethod("OPTIONS");
//        configAutenticacao.addAllowedMethod("PATCH");
//        configAutenticacao.setMaxAge(3600L);
////        source.registerCorsConfiguration("/oauth/token", configAutenticacao);
//        source.registerCorsConfiguration("/**", configAutenticacao); // Global para todas as URLs da aplicação
//
//        FilterRegistrationBean bean = new FilterRegistrationBean(new CorsFilter(source));
//        bean.setOrder(Ordered.HIGHEST_PRECEDENCE);
//        return bean;
//    }
//
//    @Override
//    public void addCorsMappings(CorsRegistry registry) {
//        registry.addMapping("/**")
//                .allowedOrigins(externalUrl)
//                .allowedMethods("*")
//                .allowedHeaders("*")
//                .allowCredentials(true)
//                .maxAge(3600);
//    }
//
//    @Override
//    protected void addResourceHandlers(ResourceHandlerRegistry registry) {
//        registry.addResourceHandler("/main.css", "/built/bundle.js")
//                .addResourceLocations("classpath::/static/main.css", "classpath::/static/built/bundle.js");
//    }
//}
