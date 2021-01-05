package project.pitchinganalyzer;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@WebServlet("/project/pitchinganalyzer/signin")
public class signinServlet extends HttpServlet {

	private static final long serialVersionUID = 1L;

	@Override
	public void init() throws ServletException {
		ServletContext context = this.getServletContext();
		User user = (User) context.getAttribute("user");
		if (user == null) {
			user = new User();
			context.setAttribute("user", user);
		}
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("UTF-8");
		HttpSession session = request.getSession();
		User user = new User();
		String name = request.getParameter("name");
		String password = request.getParameter("password");
		String json;

		if(user.registerUser(name, password)){
			session.setAttribute("UserName",name);
			// response.sendRedirect("http://localhost:8080/B15/project/pitchinganalyzer/top.html");

		StringBuilder builder = new StringBuilder();
		builder.append("true");
		json = builder.toString();
		System.out.println(json);
		}

		else{
			StringBuilder builder = new StringBuilder();
			builder.append("false");
			json = builder.toString();
			System.out.println(json);
		}

		response.setContentType("application/json");
		PrintWriter writer = response.getWriter();
		writer.append(json);
		writer.flush();

	}

}
